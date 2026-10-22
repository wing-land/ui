<script setup lang="ts">
import { componentGroups, pageLink } from '../.vitepress/component-groups'
import { docsUrl } from '../.vitepress/paths'
import DocsThumbnail from '../.vitepress/theme/DocsThumbnail.vue'
import UiCard from '../../app/components/UiCard.vue'
const pages = componentGroups.flatMap((group) => group.pages)
const componentCount = pages.reduce((total, page) => total + page.components.length, 0)
</script>

# Components

{{ componentCount }} components across {{ pages.length }} pages, sorted into {{ componentGroups.length }} categories by purpose.

<section v-for="group in componentGroups" :key="group.id" class="docs-component-group">
  <h2 :id="group.id">{{ group.text }}</h2>
  <p>{{ group.description }}</p>
  <ul class="docs-component-cards">
    <li v-for="page in group.pages" :key="page.slug">
      <UiCard :href="docsUrl(pageLink(page))">
        <template #media><DocsThumbnail :slug="page.slug" /></template>
        <h3 class="ui-card__title">{{ page.text }}</h3>
        <span class="docs-component-card__description">{{ page.description }}</span>
        <code class="docs-component-card__names">{{ page.components.join(', ') }}</code>
      </UiCard>
    </li>
  </ul>
</section>
