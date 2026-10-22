<script setup lang="ts">
import { UiTableScroll } from '@wing-land/ui'
</script>
<template>
  <div class="demo">
    <UiTableScroll label="Prices"
      ><table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sample</td>
            <td>100</td>
          </tr>
        </tbody>
      </table></UiTableScroll
    >
    <UiTableScroll label="Config options" density="compact"
      ><table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>locale</code></td>
            <td><code>en</code></td>
            <td>Language of text and dates</td>
          </tr>
          <tr>
            <td><code>timeZone</code></td>
            <td>—</td>
            <td>Time zone used to show dates</td>
          </tr>
        </tbody>
      </table></UiTableScroll
    >
  </div>
</template>
<style scoped>
.demo {
  padding: 1rem 0;
}
</style>
