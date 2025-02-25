# minus-ui

**minus-ui**는 모던한 UI 개발을 위한 모노레포 라이브러리입니다. 컴포넌트, 스타일, 타입을 모듈화하여 제공하며, 필요에 따라 개별적으로 혹은 통합적으로 사용할 수 있습니다.

Headless를 지향하기 위하여 `@minus-ui/styles`를 따로 분리하였으며, headless를 원하지 않는 사용자를 위해 `@minus-ui/core`를 추가하였습니다.

## 📁 directory 구조
```
minus-ui/
│── packages/
│   ├── component/          # @minus-ui/component (UI Components)
│   │   ├── src/
│   │   │   ├── snackbar/
│   │   │   ├── tooltip/
│   │   │   ├── index.ts    # components entry
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │
│   ├── styles/             # @minus-ui/styles (CSS, 디자인 관련)
│   │   ├── src/
│   │   │   ├── snackbar.css
│   │   │   ├── tooltip.css
│   │   │   ├── index.ts    # styles entry (각 CSS를 export)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │
│   ├── type/               # @minus-ui/type (TypeScript 타입)
│   │   ├── src/
│   │   │   ├── snackbarType.ts
│   │   │   ├── tooltipType.ts
│   │   │   ├── index.ts    # types entry
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │
│   ├── core/               # @minus-ui/core (모든 것을 한 번에 import)
│   │   ├── src/
│   │   │   ├── index.ts    # core entry (component, styles, type을 한 번에 export)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│
│── package.json            # workspace 설정
│── pnpm-workspace.yaml     # pnpm workspace 관리
│── tsconfig.base.json      # 공통 TypeScript 설정

```

## 📦 패키지 구성
`minus-ui`는 다음과 같은 4개의 워크스페이스를 포함합니다.

### 1. `@minus-ui/components`
- 다양한 UI 컴포넌트 모음입니다.
- React 기반으로 개발되었으며, 재사용 가능한 디자인 시스템을 제공합니다.

### 2. `@minus-ui/styles`
- CSS 스타일 파일 모음입니다.
- `@minus-ui/components`와 함께 사용할 수 있도록 디자인되었습니다.
- 개별적으로 스타일 시스템을 적용하고 싶은 경우 사용 가능합니다.

### 3. `@minus-ui/types`
- TypeScript에서 활용할 수 있는 타입 정의 모음입니다.
- `@minus-ui/components` 및 `@minus-ui/core`에서 사용됩니다.

### 4. `@minus-ui/core`
- `@minus-ui/components`, `@minus-ui/styles`, `@minus-ui/types`를 하나로 묶은 패키지입니다.
- 개별적으로 패키지를 설치할 필요 없이 한 번에 모든 기능을 사용하고 싶은 경우 사용하면 됩니다.

## 📥 설치 방법
필요한 패키지만 설치하거나, `@minus-ui/core`를 사용하여 한 번에 설치할 수 있습니다.

### 개별 패키지 설치
```sh
pnpm add @minus-ui/components
pnpm add @minus-ui/styles
pnpm add @minus-ui/types
```

### 전체 패키지 설치 (`core` 사용)
```sh
pnpm add @minus-ui/core
```

## 🚀 사용 방법
### `@minus-ui/components` 사용 예제
```tsx
import { Button } from "@minus-ui/components";

function App() {
  return <Button>클릭하세요</Button>;
}
```

### `@minus-ui/core` 사용 예제
```tsx
import { Button } from "@minus-ui/core";
import "@minus-ui/core/styles.css";

function App() {
  return <Button>클릭하세요</Button>;
}
```

## 🛠️ 개발 및 기여
이 프로젝트는 모노레포 형식으로 구성되어 있으며, [pnpm](https://pnpm.io/)을 사용하여 관리됩니다.

### 프로젝트 설정
```sh
git clone https://github.com/your-username/minus-ui.git
cd minus-ui
pnpm install
```

### 실행 및 빌드
```sh
pnpm build  # 모든 패키지 빌드
pnpm dev    # 개발 모드 실행
```

## 📜 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.

