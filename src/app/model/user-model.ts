export class UserModel {
    constructor(
        public name: string,
        public address: string,
        public email: string,
        public username: string,
        public password: string,
        public role: string
    ) {  }
}
