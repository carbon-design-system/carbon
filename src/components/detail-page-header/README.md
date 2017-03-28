### SCSS

#### Mixins

Mixins specific to Detail Page Header are located in [src/components/detail-page-header/_mixins.scss]().

| Name                | Params | Description                         |
|---------------------|--------|-------------------------------------|
| detail-page-header  |        | Common styles for Detail Page Header|


#### Modifiers

Use these modifiers with `.bx--detail-page-header` class.

| Selector                           | Description                                                 |
|------------------------------------|-------------------------------------------------------------|
| .bx--detail-page-header--no-tabs   | Applies styles for Detail Page Header with no tabs          |
| .bx--detail-page-header--with-tabs | Applies styles for Detail Page Header with tabs             |
| .bx--detail-page-header--scroll    | Applies styles for Detail Page Header with scroll animation |


### JavaScript

#### Public Methods

| Name    | Params | Description          |
|---------|--------|----------------------|
| release |        | Deletes the instance |

#### Options

| Option       | Default Selector               | Description                            |
|--------------|--------------------------------|----------------------------------------|
| selectorInit | [data-detail-page-header]      | A description of this awesome function |
| scroll       | bx--detail-page-header--scroll | Applies scroll animation styles        |
