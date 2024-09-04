// app/types/global.d.ts

declare module 'bcryptjs' {
  export function hashSync(data: string, saltOrRounds: string | number): string;
  export function compareSync(data: string, encrypted: string): boolean;
  export function genSaltSync(rounds?: number): string;
  export function hash(
    data: string,
    salt: string | number,
    callback: (err: Error | null, encrypted: string | null) => void
  ): void;
  export function compare(
    data: string,
    encrypted: string,
    callback: (err: Error | null, same: boolean) => void
  ): void;
  export function genSalt(
    rounds: number,
    callback: (err: Error | null, salt: string | null) => void
  ): void;
}

