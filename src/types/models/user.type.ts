import { Reward } from '@src/types/models/reward.type';
import { Quest } from '@src/types/models/quest.type';

export enum UserLanguage {
  EN = 'en',
  PTBR = 'pt-br'
}

export enum UserTheme {
  LIGHT = 'light',
  DARK = 'dark'
}

export class UpdateProfileDTO {

  public name: string;
  public avatar: string;

}

export class User {

  public _id: string;
  public avatar: string;
  public name: string;
  public email: string;
  public password: string;
  public credits: number;
  public language: UserLanguage;
  public theme: UserTheme;
  public quests: Quest[];
  public rewards: Reward[];
  public created_at: Date;
  public updated_at: Date;

}
