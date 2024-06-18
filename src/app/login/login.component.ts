import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoDirective } from '@jsverse/transloco';

import { SubjectsService } from '../subjects/subjects.service';
import { MessageCreatorService } from '../messages/message-creator.service';

@Component({
  templateUrl: './login.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, TranslocoDirective,
  ],
})
export class LoginComponent implements OnInit {
  form!: FormGroup<FormControls>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly subjectsService: SubjectsService,
    private readonly messageCreatorService: MessageCreatorService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group<FormControls>({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async onLogIn(): Promise<void> {
    const sha = await this.generateSha512(this.form.value.password!);
    const msg = this.messageCreatorService.createAuthMessageRequest();
    msg.body.username = this.form.value.username!;
    msg.body.passwordHash = sha;
    this.subjectsService.getSendMessageSubject().next(msg);
  }

  async generateSha512(value: string): Promise<string> {
    const buffer = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(value));
    const buff = new Uint8Array(buffer);
    const hexBytes = new Array(buff.length);

    for (let i = 0; i < buff.length; ++i) {
      hexBytes[i] = buff[i].toString(16).padStart(2, '0');
    }

    return hexBytes.join('');
  }
}
interface FormControls {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}
