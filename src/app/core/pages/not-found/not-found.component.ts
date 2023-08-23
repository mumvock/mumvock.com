import { Component } from '@angular/core';

@Component({
  template: `
    <section>
        <header>
            <h1>Not found</h1>
        </header>

        <p>Alas! Brave adventurer, you have met a sad fate.</p>
        Sailing in distant seas is dangerous, it seems Leviathan didn't take pity on you.
        <p class="mb-0">
            But do not despair, for the gods will bring you
            <a routerLink="/" class="tibia-anchor">back to home</a>.
        </p>
    </section>
  `,
})
export class NotFoundComponent {}
