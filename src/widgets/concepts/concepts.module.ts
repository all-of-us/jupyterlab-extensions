import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CohortConceptsComponent} from './cohort-concepts/cohort-concepts.component';
import {ConceptSearchComponent} from './concept-search/concept-search.component';


@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [
    CohortConceptsComponent,
    ConceptSearchComponent
  ],
  exports: [
    CohortConceptsComponent,
    ConceptSearchComponent
  ]
})
export class ConceptsModule {}
