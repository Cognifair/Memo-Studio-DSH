// glyph-roll.js 的类型声明（独立，不依赖 svelte 类型）。字段与 svelte-glyph-roll 0.6.0 一致。

export interface GlyphRollProps {
  /** 显示的文本，逐字形 diff 并动画 */
  value: string | number;
  /** 滚动方向；时钟请用 "down"。默认 "auto" */
  direction?: "auto" | "up" | "down";
  /** 名义时长 ms，默认 420 */
  duration?: number;
  /** 回弹幅度 0–0.95，默认 0.46 */
  bounce?: number;
  /** 进出场缩放 0–2，1 = 不缩放，默认 0.4 */
  enterScale?: number;
  /** 滚动距离（占行高比例）0–3，默认 0.333 */
  travel?: number;
  /** 模糊强度 0–8，0 = 关闭，默认 1 */
  blurIntensity?: number;
  /** 模糊半径上限（px），默认无上限 */
  maxBlurRadius?: number;
  /** 裁切到行框并羽化边缘，默认 true */
  clip?: boolean;
  /** false = 立即切换，默认 true；系统「减少动态效果」时自动为 false */
  animated?: boolean;
  /** 水平对齐，默认 "start" */
  alignment?: "start" | "center" | "end";
  /** 小数点字符，默认 "." */
  decimalSeparator?: string;
  /** 等宽数字（tabular-nums），时钟必须开。默认 false */
  monospacedDigits?: boolean;
  /** 透传到内部 <span> 的 class */
  class?: string;
  /** 透传到内部 <span> 的 style 字符串 */
  style?: string;
}

export interface GlyphRollHandle {
  update(next: Partial<GlyphRollProps>): void;
  destroy(): void;
}

export declare function createGlyphRoll(target: Element, initial: GlyphRollProps): GlyphRollHandle;

export declare const STANDBY_PRESET: {
  readonly direction: "down";
  readonly duration: 600;
  readonly bounce: 0.3;
  readonly travel: 0.6;
  readonly enterScale: 0.85;
  readonly blurIntensity: 2;
  readonly monospacedDigits: true;
};
