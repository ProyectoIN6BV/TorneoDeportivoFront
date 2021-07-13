export class Match{
    constructor(
        public _id:String,
        public matchNumber: String,
        public playersOne: [],
        public playersSecond: [],
        public goalsFirst: Number,
        public goalsSecond:Number,
        public foulOne: Number,
        public foulSecond: Number,
        public date: Date,
        public leagues: []
    ){}
}