export class User{
    constructor(
        public _id: String,
        public name: String,
        public lastname: String,
        public phone: number,
        public email: String,
        public username: String,
        public password: String,
        public role: String,
        public league: []
    ){}
}