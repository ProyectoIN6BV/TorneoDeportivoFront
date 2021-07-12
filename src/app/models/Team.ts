export class Team {
    constructor(
        public _id:String,
        public name: String,
        public logo: String,
        public points: Number,
        public PJ: Number,
        public PG: Number,
        public PE: Number,
        public PP: Number,
        public GF: Number,
        public GC: Number,
        public GD: Number,
        public players: []
    ){}
}