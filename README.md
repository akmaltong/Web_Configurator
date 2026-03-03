# 3D Конфигуратор интерактивного оборудования

Веб-приложение для просмотра и выбора интерактивного оборудования в 3D.

**Demo:** https://akmaltong.github.io/Web_Configurator/

## Что внутри

Каталог из 11 единиц оборудования, разбитых по категориям:

| Категория | Продукты |
|-----------|----------|
| Панели | Extra Touch Школа, Extra Touch Double |
| Столы | Интерактивный стол 84″ |
| Киоски | Платёжный киоск, Sci-Fi Kiosk |
| Экраны | IQ-Wall 4×4, LED Stand Panel, Monitoring Station, Настенный ТВ |
| Стенды | Стенд 2.0 с крышей, Стенд с панелью |

## Управление

- **Левая кнопка мыши** — вращение камеры
- **Колёсико (зажать)** — панорамирование
- **Правая кнопка мыши** — панорамирование
- **Скролл** — зум

## Стек

- **React 18** — UI
- **Three.js** — 3D-рендеринг
- **@react-three/fiber** — React-обёртка над Three.js
- **@react-three/drei** — хелперы (OrbitControls, Environment, useGLTF, ContactShadows)
- **GLB-модели** — реальные 3D-модели оборудования с PBR-материалами

## Структура проекта

```
src/
  App.js            — главный компонент: Canvas + Sidebar
  ProductScene.js   — загрузка GLB, автоцентрирование, масштабирование
  Sidebar.js        — панель выбора продукта и категории
  products.js       — каталог продуктов (пути к моделям, повороты, категории)
  index.js          — точка входа
  styles.css        — глобальные стили
public/
  models/           — GLB-модели оборудования
  adamsbridge.hdr   — HDR-карта окружения для реалистичных отражений
```

## Запуск локально

```bash
npm install
npm start
```

Откроется на http://localhost:3000

## Деплой на GitHub Pages

```bash
npm run deploy
```

Билдит проект и публикует ветку `gh-pages`.

## Добавление новой модели

1. Положить `.glb` файл в `public/models/`
2. Добавить запись в `src/products.js`:
```js
"my-product": {
  id: "my-product",
  name: "Название",
  description: "Описание",
  model: `${BASE}/models/my-product.glb`,
  category: "kiosks",   // panels | tables | kiosks | screens | stands
  rotation: 0,          // поворот в радианах (Math.PI = 180°)
},
```

Если модель использует `KHR_materials_pbrSpecularGlossiness`, конвертировать:
```bash
npx @gltf-transform/cli metalrough input.glb output.glb
```
