export class League{
    constructor(
        public name: String,
        public season: String,
        public logo: String,
        public description: String,
        public firstDate: Date,
        public lastDate: Date,
        public teams: [],
        public sessions: []
    ){}
}