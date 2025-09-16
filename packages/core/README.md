# @minus-ui/core

`@minus-ui/core`가 새롭게 변경되었습니다.\
이 패키지를 사용하면 내부에 컴포넌트들을 쉽고 빠르게 사용하실 수 있습니다!

## 📥 설치

```sh
pnpm add @minus-ui/core
```

## 📁 디렉터리 구조

```
packages/
├── core/
│   ├── src/
│   │   ├── components/
│   │   │   ├── imageViewer/
│   │   │   ├── snackbar/
│   │   │   └── tooltip/
│   │   ├── types/
│   │   ├── tailwind/
│   │   │   └── plugin.css
│   │   ├── index.ts
│   │   ├── utils.ts
│   │   └── windowBridge.ts
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.json
│   ├── vite.config.ts
```
## 🔒 변경 사항

### 1️⃣ **Tailwind 지원**

- tailwind css 사용할 수 있도록 지원
- 기본 스타일을 위한 plugin 지원
- tailwind를 import 한 global.css에 tailwindcss 바로 밑에 plugin 적용 \
해당 plugin을 적용하지 않으면 UI가 깨질 수 있습니다.\
그럴 경우 처음부터 직접 style을 입혀야 하기에 plugin 적용을 추천 드립니다.

```css
@import "tailwindcss";

@import "@minus-ui/core/plugin";
```

### 2️⃣ **편의성 확대**

- 외부에서 컨트롤 하는 요소들을 최대한 배제
- ex) 페이지 이동시 자동으로 Snackbar unmount

## 🚀 사용 방법

### 1️⃣ **Tooltip 사용 예제**

```tsx
import { Tooltip } from "@minus-ui/core";

function App() {
  return (
      <Tooltip
        containerClassName="inline-block"
        contentClassName="text-red-500 font-bold"
        contents={"It's tooltip!"}
        position="left-top"
        backgroundColor="white"
        isDraggable
        isTail={false}
      >
        <div className="w-[70px] truncate text-green-500 border-1">
          hover me
        </div>
      </Tooltip>
  );
}
```

### 2️⃣ **Snackbar 사용 예제**

```tsx
import { Snackbar } from "@minus-ui/core";

  Snackbar.show({
    message: "hi! This is Minus-Snackbar!",
    type: "success",
    autoClose: true,
    autoCloseTime: "2s",
    snackbarPosition: "top",
    maxCount: 10,
  });

```

### 2️⃣ **ImageViewer 사용 예제**

```tsx
import { ImageViewer } from "@minus-ui/core";

  ImageViewer.show({
    url: "/vite.svg",
    icons: {
      flipVertical: <Icon size={30} />,
      flipHorizontal: <Icon />,
      rotateLeft: <Icon />,
      rotateRight: <Icon />,
      zoomIn: <Icon />,
      zoomOut: <Icon />,
    },
  });

```

## 🛠️ 개발 및 기여

이 프로젝트는 [pnpm](https://pnpm.io/)을 사용하여 관리됩니다.


## 📜 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

