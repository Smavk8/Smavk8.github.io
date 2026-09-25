# Xylen Platform Web — Инструкция для ИИ-агентов (AI Agent Manifesto)

Этот документ предназначен для любого ИИ-агента (GitHub Copilot Workspace, Devin, Claude Code, Antigravity, Cursor и др.), который работает с репозиторием в облаке или локально.

---

## 1. Архитектура проекта и репозитории

* **Основной репозиторий (Primary):** `https://github.com/Smavk8/xylen-platform-web.git` (ветка `main`)
* **Вторичный репозиторий / зеркало (Mirror):** `https://github.com/Smavk8/Smavk8.github.io.git` (ветка `main`)
* **Сайт в интернете:** `https://xylen-platform.pages.dev` (Cloudflare Pages)
* **Технологический стек:** Чистый Vanilla Web (HTML5, современный CSS3, ES6+ JavaScript). Никаких Webpack, Vite, React или сложных сборщиков — все файлы отдаются напрямую как статика.

---

## 2. Структура файлов

```
├── index.html                 # Главная страница: вся разметка секций и страниц
├── css/
│   ├── styles.css             # Базовые стили платформы, сетки, темы (Dark/Light)
│   ├── home-expansion.css     # Блоки расширения, карточки, интерактив
│   ├── experience.css         # Оформление секций
│   ├── architecture-motion.css# Анимация блока главной страницы
│   └── xylen-motion.css       # Карусель видеороликов, амбиентный фон и адаптив
├── js/
│   ├── app.js                 # Роутер страниц, управление табами, drawer, модалки
│   ├── i18n.js                # Полная локализация: Русский (RU), Узбекский (UZ), Английский (EN)
│   ├── xylen-motion.js        # Управление видео через IntersectionObserver (автопауза)
│   ├── refinements.js         # Фильтрация, таблицы, генератор QR-кодов
│   └── storage.js             # Локальное хранилище настроек сессии
├── assets/                    # Медиафайлы: иконки, логотипы (.png), видео (.webm, .mp4)
├── functions/                 # Cloudflare Pages Functions (бэкенд API / JWT auth)
└── wrangler.json              # Конфигурация Cloudflare Pages
```

---

## 3. Критические правила для ИИ-агента (Strict Constraints)

1. **Сохранение видео (Videos are Mandatory):**
   * Секция архитектуры телеметрии и три карточки удалены по прямому запросу пользователя. Не восстанавливать их без нового запроса.
   * В карусели Motion (`.motion-carousel-track`) используются WebM-видео (`assets/motion-*.webm`).
   * **ЗАПРЕЩЕНО** удалять или заменять видео карусели статическими картинками.
2. **Многоязычность (i18n):**
   * При добавлении или изменении любых текстов в `index.html` **обязательно** синхронизировать переводы в `js/i18n.js` для всех трёх языков (`ru`, `uz`, `en`).
3. **Производительность 60 FPS:**
   * Все анимации должны поддерживать `prefers-reduced-motion: reduce`.
   * Воспроизведение видео вне области видимости должно быть остановлено через `IntersectionObserver` (реализовано в `js/xylen-motion.js`).

---

## 4. Рабочий процесс агента в Git (Workflow)

Перед началом работы:
```bash
git pull origin main
```

После завершения изменений:
```bash
# 1. Проверить изменения
git status

# 2. Добавить и закоммитить
git add .
git commit -m "тип: краткое понятное описание сделанного"

# 3. Отправить в основной репозиторий
git push origin main

# 4. Синхронизировать зеркало
git push short main --force
```

---

## 5. Деплой и публикация на домене

* **Автоматически:** При пуше в ветку `main` репозитория `Smavk8/xylen-platform-web` Cloudflare Pages автоматически собирает и публикует сайт в течение 20 секунд.
* **Вручную (при необходимости):**
  ```bash
  npx wrangler@4.137.0 pages deploy . --project-name=xylen-platform
  ```
* **Проверка доступности:**
  ```bash
  curl -sI https://xylen-platform.pages.dev
  ```
