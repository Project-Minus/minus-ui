# @minus-ui/core

\*\*`@minus-ui/core`\*\*는 `minus-ui`의 모든 구성 요소를 통합하여 한 번에 사용할 수 있도록 제공하는 패키지입니다.\
이 패키지를 사용하면 `@minus-ui/components`, `@minus-ui/styles`, `@minus-ui/types`를 개별적으로 설치할 필요 없이, 한 번의 설치로 모두 사용할 수 있습니다.

## 📥 설치

```sh
pnpm add @minus-ui/core
```

## 📁 디렉터리 구조

```
packages/core/
│── src/
│   ├── index.ts    # 모든 모듈 통합
│── package.json
│── tsconfig.json
│── vite.config.ts
```

## 🎯 주요 기능

- `@minus-ui/components`, `@minus-ui/styles`, `@minus-ui/types`를 한 번에 제공
- 별도 개별 패키지 설치 없이 모든 기능을 바로 사용 가능
- 공통 설정을 관리하여 일관된 스타일 및 타입 적용 가능

## 🚀 사용 방법

### 1️⃣ **컴포넌트, 스타일, 타입 한 번에 사용하기**

```tsx
import { Snackbar, Tooltip } from "@minus-ui/core";
import "@minus-ui/core/tooltip.css";

function App() {
  return (
    <>
      <Tooltip contents={<button>Hover me</button>} bubbleContents="Tooltip text" position="bottom" />
    </>
  );
}
```

### 2️⃣ **Snackbar 사용 예제 (비동기)**

```tsx
import { Snackbar } from "@minus-ui/core";

async function showSnackbar() {
  await Snackbar.success({
    message: "Operation successful!",
    autoClose: false,
    snackbarPosition: "bottom",
  });
  
  // autoClose가 false이면 직접 닫아야 함
  setTimeout(() => {
    Snackbar.unmount();
  }, 5000);
}

showSnackbar();
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

