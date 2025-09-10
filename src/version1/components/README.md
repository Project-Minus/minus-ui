# @minus-ui/components

`@minus-ui/components`는 `minus-ui`의 핵심 UI 컴포넌트들을 제공하는 패키지입니다.  
재사용 가능한 컴포넌트들을 포함하며, `Snackbar`, `Tooltip` 등과 같은 인터랙티브 요소를 제공합니다.

## 📥 설치
```sh
pnpm add @minus-ui/components
```

## 📁 디렉터리 구조
```
packages/components/
│── src/
│   ├── snackbar/
│   ├── tooltip/
│   ├── index.ts    # components entry
│── package.json
│── tsconfig.json
│── vite.config.ts
```

## 🎯 제공하는 컴포넌트
### 1️⃣ **Snackbar**
#### 설명
특정 동작 이후, 사용자에게 주고 싶은 정보를 정해진 시간 동안 보여줍니다.  
컴포넌트를 직접 호출하지 않아도 `Snackbar.show(config)`처럼 간단히 사용할 수 있으며,  
property를 통해 시간, 스타일 등을 직접 커스텀할 수 있습니다.

#### ⚠️ **주의 사항**
1. `Snackbar`는 **비동기**로 작성해야 합니다.
2. 직접 호출하기보다 **show, success 등의 메서드를 통해 접근하는 것을 권장**합니다.
3. `autoClose`가 `false`로 설정된 경우, **`Snackbar.unmount()`를 호출하여 직접 닫아야 합니다.**

#### 📌 **Method 목록**
| 메서드 | 설명 | 기본 색상 |
|--------|------|----------|
| `show` | 기본 Snackbar를 호출합니다. | `{}` |
| `info` | 정보 메시지를 표시합니다. | `color: #16164b, backgroundColor: #DEDCF9` |
| `success` | 성공 메시지를 표시합니다. | `color: #2E4E2E, backgroundColor: #DEF9DC` |
| `warning` | 경고 메시지를 표시합니다. | `color: #5C5536, backgroundColor: #FDF3AA` |
| `error` | 오류 메시지를 표시합니다. | `color: #4E2E2E, backgroundColor: #F9DEDC` |
| `unmount` | 현재 표시된 Snackbar를 제거합니다. | `N/A` |

#### 📌 **Method에 전달되는 Config Property 목록**
| 속성 | 필수 여부 | 설명 | 기본값 |
|------|---------|------|--------|
| `message` | ✅ | Snackbar 안에 표출될 내용을 지정합니다. | "" |
| `snackbarPosition` | ❌ | Snackbar가 출력될 위치를 지정합니다. | `top` |
| `status` | ❌ | Snackbar의 상태를 지정할 수 있습니다. | `show` |
| `maxCount` | ❌ | 한 번에 출력될 수 있는 Snackbar의 개수를 설정합니다. | `infinity` |
| `icons` | ❌ | Snackbar 맨 앞에 출력될 icon을 선택합니다. | `X` |
| `autoClose` | ❌ | 일정 시간 후 Snackbar가 자동으로 닫히게 할지 선택합니다. | `true` |
| `autoCloseTime` | ❌ | 설정한 시간 뒤에 Snackbar가 자동으로 닫힙니다. (s, ms 단위) | `2s` |
| `CSSProperties` | ❌ | CSS 속성을 사용하여 원하는 스타일로 변경합니다. | `X` |

#### 📌 **사용 방법** (비동기 예제)
```tsx
import { Snackbar } from "@minus-ui/components";

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

### 2️⃣ **Tooltip**
#### 설명
렌더링 직후에는 보이지 않다가 특정 요소에 `hover` 이벤트가 발생하면  
출력되는 요소로, 부모 요소의 크기를 계산하여 반영합니다.  
정해진 property를 통해 사용자가 직접 커스텀할 수 있습니다.

#### 📌 **Method에 전달되는 Config Property 목록**
| 속성 | 필수 여부 | 설명 | 기본값 |
|------|---------|------|--------|
| `contents` | ✅ | `hover` 이벤트가 일어날 요소를 지정합니다. | "" |
| `bubbleContents` | ✅ | 말풍선 속에 표출될 내용을 지정합니다. | "" |
| `position` | ❌ | 8가지 속성에 따라 말풍선의 위치를 변경할 수 있습니다. | `top` |
| `textColor` | ❌ | 말풍선 속 텍스트 색을 변경할 수 있습니다. | `#FFFFFF` |
| `backgroundColor` | ❌ | 말풍선의 배경 색을 변경할 수 있습니다. | `#313131` |
| `size` | ❌ | 말풍선의 크기를 4가지 속성을 사용하여 변경할 수 있습니다. | `medium` |
| `isTail` | ❌ | 이 속성을 `false`로 설정하면, 말풍선 꼬리가 표출되지 않습니다. | `true` |
| `isShowBubble` | ❌ | 이 속성을 `false`로 설정하면, 말풍선이 나오지 않습니다. | `true` |
| `isDraggable` | ❌ | 이 속성을 `true`로 설정하면, 말풍선 속 내용을 `drag` 할 수 있습니다. | `false` |
| `checkOverflow` | ❌ | 이 속성을 `true`로 설정하면, 말줄임 처리가 되어있는 요소만 말풍선이 표출됩니다. | `true` |
| `boxStyle` | ❌ | 해당 요소를 감싸고 있는 상위 요소의 스타일을 직접 수정합니다. | `{}` |
| `boxContentStyle` | ❌ | `hover` 이벤트가 일어나는 요소의 스타일을 직접 수정합니다. | `{}` |

#### 📌 **사용 방법**
```tsx
import { Tooltip } from "@minus-ui/components";

function App() {
  return (
    <Tooltip contents={<button>Hover me</button>} bubbleContents="Tooltip text" position="bottom" />
  );
}
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
