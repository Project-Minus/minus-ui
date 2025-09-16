# minus-ui

**minus-ui**는 모던한 UI 개발을 위한 라이브러리 입니다!
최근 tailwind 지원으로 새롭게 변경되어서 더 편하게 사용하실 수 있습니다!

## 📁 directory 구조
```
minus-ui/
│── packages/
│   ├── core/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── imageViewer/
│   │   │   │   ├── snackbar/
│   │   │   │   └── tooltip/
│   │   │   ├── types/
│   │   │   ├── tailwind/
│   │   │   │   └── plugin.css
│   │   │   ├── index.ts
│   │   │   ├── utils.ts
│   │   │   └── windowBridge.ts
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│
│── package.json            # workspace 설정
│── pnpm-workspace.yaml     # pnpm workspace 관리
│── tsconfig.base.json      # 공통 TypeScript 설정

```

### 패키지 설치
```sh
pnpm add @minus-ui/core
```
### 주의사항
`@minus-ui/types`, `@minus-ui/styles`, `@minus-ui/components` 패키지들은
더 이상 업데이트 & 지원되지 않습니다! core를 사용해주세요!


## 🛠️ 개발 및 기여
이 프로젝트는 모노레포 형식으로 구성되어 있으며, [pnpm](https://pnpm.io/)을 사용하여 관리됩니다.

### 실행 및 빌드
```sh
pnpm build  # 모든 패키지 빌드
pnpm dev    # 개발 모드 실행
```

## 📜 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.