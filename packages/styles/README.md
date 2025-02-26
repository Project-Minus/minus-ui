# @minus-ui/styles

**`@minus-ui/styles`**는 `minus-ui`의 스타일 시스템을 담당하는 패키지입니다.  
컴포넌트의 스타일을 개별적으로 적용하거나, 다른 UI 라이브러리와 조합하여 사용할 수 있도록 설계되었습니다.

## 📥 설치
```sh
pnpm add @minus-ui/styles
```

## 🎨 사용 방법

### 1️⃣ **CSS 직접 import**
각 스타일을 개별적으로 불러와 사용할 수 있습니다.

```tsx
import "@minus-ui/styles/snackbar.css";
import "@minus-ui/styles/tooltip.css";
```

### 2️⃣ **TypeScript 모듈을 활용한 스타일 적용**
모든 스타일을 한 번에 불러올 수도 있습니다.

```tsx
import "@minus-ui/styles/index.css";
```

> 📌 **주의:** `@minus-ui/styles`는 `@minus-ui/components` 없이 독립적으로 사용할 수 있습니다.

## 📁 디렉터리 구조
```
packages/styles/
│── src/
│   ├── snackbar.css
│   ├── tooltip.css
│   ├── index.ts    # CSS export
│── package.json
│── tsconfig.json
│── vite.config.ts
```

## 🛠️ 개발 및 기여
이 프로젝트는 [pnpm](https://pnpm.io/)을 사용하여 관리됩니다.

### 1️⃣ 패키지 설치
```sh
pnpm install
```

### 2️⃣ 개발 서버 실행
```sh
pnpm dev
```

### 3️⃣ 빌드
```sh
pnpm build
```

## 📜 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.

