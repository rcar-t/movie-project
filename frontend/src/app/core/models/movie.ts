export class Movie {

    constructor(
        public id: string,
        public title: string, 
        public original_language: string, 
        public release_date: string, 
        public overview: string,
        public vote_count: string,
        public popularity: number,
        public backdropPath: string,
        public adult: boolean,
        public genres: Array<Genre>,
        public homepage: string,
        public poster_path: string,
        public vote_average: number,
        public runtime: number,
        public tagline: string,
    ) {    }
    
}

class Genre {
    constructor(
        public id: number,
        public name: string
    ){}
}

export class Slides {
    constructor(
        public image: string, 
    ) {}
}

export class Image {
    constructor(
        public base_url: string, 
        public backdrop_sizes: Array<string>,
        public logo_sizes: Array<string>,
        public poster_sizes: Array<string>,
        public profile_sizes: Array<string>,
        public still_sizes: Array<String>
    ) {}
}