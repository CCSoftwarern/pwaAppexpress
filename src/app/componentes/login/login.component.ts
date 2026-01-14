
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environment';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!Storage.prototype.getItem.call(localStorage, 'motoboy')) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/principal']);
    }
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
      this.isLoading = false;
      this.router.navigate(['/principal']);
    }

    // 3. Retornar dados do motoboy
    this.router.navigate(['/principal']);
    console.log('Login realizado com sucesso', data);
    Storage.prototype.setItem.call(localStorage, 'motoboy', JSON.stringify(data));
    return data;
  }

  async CriarSenha() {
    const senha = '123456';
    const hash = await bcrypt.hash(senha, 10); // gera o hash seguro

    // const { data, error } = await supabase
    //   .from('motoboys')
    //   .insert([{ email: 'teste@exemplo.com', senha: hash }]);
    this.senhaCriada = hash;

  }

  show(type: string, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    // Fecha automaticamente após 3 segundos
    setTimeout(() => this.showAlert = false, 3000);
  }


}
