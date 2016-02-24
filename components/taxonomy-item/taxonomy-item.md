# Taxonomy Item

## Taxonomy Item Styles
### Global Dashboard

![Global Dashboard](https://uploads.github.ibm.com/github-enterprise-assets/0000/2212/0000/8852/927dba40-c9c1-11e5-90f2-dbec9a4e8037.png)

Create a global dashboard taxonomy item:

```html
<a href="" class="taxonomy-item--global-dash is-empty">
  <div class="taxonomy-item__icon">
    <svg class="svg--taxonomy--compute-dims">
      <use xlink:href="../../images/sprite.svg#taxonomy--compute"></use>
    </svg>
  </div>
  <p class="taxonomy-item__metric"></p>
  <p class="taxonomy-item__label">Compute</p>
</a>
```

#### Taxonomy Item states

* Empty state

![Empty state](https://uploads.github.ibm.com/github-enterprise-assets/0000/2212/0000/8853/cfeb859c-c9c1-11e5-9cff-f85fbe6e64c8.png)

To create the empty state, add the class ```is-empty```.

* Healthy state

![Healhty state](https://uploads.github.ibm.com/github-enterprise-assets/0000/2212/0000/8868/554dadcc-c9c3-11e5-9503-39928e2a5dd7.png)

To create the healthy state, add the class ```is-healthy```.

* Error state

![Error state](https://uploads.github.ibm.com/github-enterprise-assets/0000/2212/0000/8867/554ca206-c9c3-11e5-948e-807ce62aede0.png)

To create the error state, add the class ```is-error```.

* Stopped state

![Stopped state](https://uploads.github.ibm.com/github-enterprise-assets/0000/2212/0000/8866/554c8208-c9c3-11e5-8ec7-4db9fc247789.png)

To create the stopped state, add the class ```is-stopped```.

### Taxonomy Menu

![Taxonomy Menu](https://uploads.github.ibm.com/github-enterprise-assets/0000/2212/0000/8871/b47e2088-c9c3-11e5-8b67-b47196b3eae9.png)

Create a taxonomy menu item:

```html
<a href="" class="taxonomy-item--taxonomy-menu">
  <div class="taxonomy-item__icon">
    <svg class="svg--taxonomy--compute-dims">
      <use xlink:href="../../images/sprite.svg#taxonomy--compute"></use>
    </svg>
  </div>
  <p class="taxonomy-item__label">Compute</p>
</a>
```
