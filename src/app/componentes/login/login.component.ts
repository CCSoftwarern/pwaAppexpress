
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Motoboy } from '../../interfaces/motoboy';
import { initializeApp } from '@angular/fire/app';
import { getMessaging, getToken, onMessage } from '@angular/fire/messaging';
import { tap } from 'rxjs/operators';


const supabase = createClient(environment.supabase.supabaseUrl, environment.supabase.supabaseKey);

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  token: string = '';
  isLoading: boolean = false;
  senhaCriada: string = '';
  email = '';
  password = '';
  visible: boolean = false;
  showAlert = false;
  alertType = 'success'; // success | danger | warning | info
  alertMessage = 'Operação realizada com sucesso!';
  motoboy: Motoboy[] = [];
  dadosMotoboy: any = null;
  private messaging: any;


  constructor(private router: Router) { }
  ngOnInit(): void {
    const app = initializeApp(environment.firebase);
    this.messaging = getMessaging(app);
    this.requestPermission();

    const savedUser = localStorage.getItem('motoboy');
    if (savedUser) {
      this.dadosMotoboy = JSON.parse(savedUser);
      this.router.navigate(['/principal/'+this.dadosMotoboy.id]);
    }

    onMessage(this.messaging, (payload) => {
      alert(JSON.stringify(payload));
      // ...
    });
  }


  async loginMotoboy() {
    // 1. Buscar usuário por email
    this.isLoading = true;
    const { data, error } = await supabase
      .from('motoboys')
      .select('*')
      .eq('enail', this.email)
      .single(); // espera só um usuário

    if (error || !data) {
      this.show('danger', 'Usuário não encontrado');
      console.error('Usuário não encontrado');
      this.isLoading = false
      return null;
    }

    // 2. Verificar senha
    const senhaCorreta = await bcrypt.compare(this.password, data.senha);
    if (!senhaCorreta) {
      console.error('Senha incorreta ');
      this.show('danger', 'Senha incorreta');
      this.isLoading = false;
      return null;
    } else {
      console.log('Senha correta');
      this.AtualizarTokenMotoboy(data.id, this.token)
      this.isLoading = false;
      this.router.navigate(['/principal/'+data.id]);
    }

    localStorage.setItem('motoboy', JSON.stringify(data));

    // 3. Retornar dados do motoboy
    this.router.navigate(['/principal/'+data.id]);
    return data;
  }

  async AtualizarTokenMotoboy(motoboyId:number, novoToken:string) {
  const { data, error } = await supabase
    .from('motoboys') // Nome da tabela onde estão os motoboys
    .update({ tokencelular: novoToken }) // Campo que será atualizado
    .eq('id', motoboyId) // Campo de identificação (pode ser id, cpf, email, etc.)

  if (error) {
    console.error('Erro ao atualizar token:', error)
    return null
  }

  console.log('Token atualizado com sucesso:', data)
  return data
}

  async CriarSenha() {
    const senha = '123456';
    const hash = await bcrypt.hash(senha, 10); // gera o hash seguro

    const { data, error } = await supabase
      .from('motoboys')
      .insert([{ email: 'teste@exemplo.com', senha: hash }]);
    this.senhaCriada = hash;

  }

  show(type: string, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    // Fecha automaticamente após 3 segundos
    setTimeout(() => this.showAlert = false, 3000);
  }

  requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        getToken(this.messaging, {
          vapidKey: environment.firebase.vapidKey,
        })
          .then((currentToken: string) => {
            if (currentToken) {
              this.token = currentToken;
              console.log(currentToken);
            } else {
              console.log(
                'No registration token available. Request permission to generate one.'
              );
            }
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    });
  }



}
