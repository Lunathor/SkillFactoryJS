# Security Guide - Руководство по безопасности

## 🚨 КРИТИЧЕСКАЯ ПРОБЛЕМА БЕЗОПАСНОСТИ

**Ваш Google API ключ был скомпрометирован и публично раскрыт!**

### Немедленные действия:

1. **Отзовите скомпрометированный ключ:**
   - Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
   - Выберите ваш проект
   - Перейдите в "APIs & Services" → "Credentials"
   - Найдите ключ: `AIzaSyBv5t9xefBc5hNNpY7QufyZwZLKM6E1EBO`
   - Нажмите "Delete" или "Revoke"

2. **Создайте новый API ключ:**
   - В том же разделе "Credentials"
   - Нажмите "Create Credentials" → "API Key"
   - Скопируйте новый ключ
   - Настройте ограничения (рекомендуется):
     - Application restrictions: HTTP referrers
     - API restrictions: Google Books API

3. **Обновите код:**
   - Откройте файл `.env`
   - Замените старый ключ на новый
   - Убедитесь, что файл `.env` добавлен в `.gitignore`

## Лучшие практики безопасности

### 1. Переменные окружения
✅ **Правильно:**
```javascript
// В .env файле
GOOGLE_BOOKS_API_KEY=your_secret_key_here

// В коде
const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
```

❌ **Неправильно:**
```javascript
// Никогда не хардкодите ключи в коде!
const apiKey = 'AIzaSyBv5t9xefBc5hNNpY7QufyZwZLKM6E1EBO';
```

### 2. Git и секреты
- ✅ Добавьте `.env` в `.gitignore`
- ✅ Используйте `.env.example` для шаблона
- ❌ Никогда не коммитьте файлы с секретами
- ❌ Не добавляйте ключи в комментарии кода

### 3. Ограничения API ключей
- Настройте ограничения по доменам
- Ограничьте доступ только к нужным API
- Регулярно ротируйте ключи
- Мониторьте использование ключей

### 4. Проверка безопасности
```bash
# Проверьте, что .env в .gitignore
git check-ignore .env

# Проверьте, что секреты не в истории Git
git log --all --full-history -- .env

# Поиск хардкодированных ключей
grep -r "AIzaSy" src/ --exclude-dir=node_modules
```

## Восстановление после инцидента

1. **Отзовите все скомпрометированные ключи**
2. **Создайте новые ключи с ограничениями**
3. **Обновите все сервисы**
4. **Проверьте логи на подозрительную активность**
5. **Обновите документацию по безопасности**

## Контакты для поддержки

- Google Cloud Support: https://cloud.google.com/support
- GitHub Security: https://github.com/security
- Документация по безопасности: https://cloud.google.com/security

---
**Помните:** Безопасность - это процесс, а не одноразовое действие!
