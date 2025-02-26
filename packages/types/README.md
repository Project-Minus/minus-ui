# @minus-ui/types

**`@minus-ui/types`**는 `minus-ui`에서 사용되는 TypeScript 타입 정의를 제공하는 패키지입니다.  
이 패키지를 사용하면 컴포넌트와 스타일을 더 안전하게 사용할 수 있으며, TypeScript의 정적 분석을 활용할 수 있습니다.

## 📥 설치
```sh
pnpm add @minus-ui/types
```

## 🎯 주요 기능
- `minus-ui` 컴포넌트 및 스타일과 관련된 **타입 정의 제공**
- `@minus-ui/components` 및 `@minus-ui/core`에서 활용 가능
- 독립적인 TypeScript 프로젝트에서도 활용 가능

## 🛠 사용 방법

### 1️⃣ **타입 정의 import**
각 타입을 개별적으로 불러와 사용할 수 있습니다.

```tsx
import { SnackbarType } from "@minus-ui/types";
```

### 2️⃣ **전체 타입 불러오기**

```tsx
import * as MinusUITypes from "@minus-ui/types";
```

> 📌 **주의:** `@minus-ui/types`는 `@minus-ui/components` 없이 독립적으로 사용할 수 있습니다.

## 📁 디렉터리 구조
```
packages/types/
│── src/
│   ├── snackbarType.ts
│   ├── tooltipType.ts
│   ├── index.ts    # 타입 export
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
