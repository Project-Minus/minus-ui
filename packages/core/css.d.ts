declare module "@minus-ui/core/snackbar" {
  /**
   * CSS 모듈을 나타내는 인터페이스.
   * CSS 파일이 스타일 객체가 아닌 단순 문자열로 가져와지므로
   * 여기서는 별도의 속성을 정의하지 않습니다.
   */
  const cssContent: string;
  export default cssContent;
}

// 다른 CSS 파일들도 동일하게 정의
declare module "@minus-ui/core/tooltip" {
  const cssContent: string;
  export default cssContent;
}

declare module "@minus-ui/core/index.css" {
  const cssContent: string;
  export default cssContent;
}
