export class Session{
    constructor(
        public _id:String,
        public name: String,    
        public dateFirst: Date, 
        public dateSecond: Date, 
        public matchs: [],
        public leagues: []
    ){}
}