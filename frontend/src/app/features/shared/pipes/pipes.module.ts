import { NgModule } from "@angular/core";

import { FormatLanguagePipe } from "./movie-language.pipe";

@NgModule({
    declarations: [
        FormatLanguagePipe,
    ], 
    imports:[],
    exports: [
        FormatLanguagePipe
    ]
})
export class PipesModule {}