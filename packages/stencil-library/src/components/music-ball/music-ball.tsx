import { Component, Prop, State, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'music-ball',
  styleUrl: 'music-ball.css',
  shadow: true,
})
export class MusicBall {
  /**
   * size of the ball
   */
  @Prop() size: number = 180;
  /**
   * music url
   */
  @Prop() musicUrl: string = '';
  /**
   * music title
   */
  @Prop() musicTitle: string = '';
  /**
   * music artist
   */
  @Prop() musicArtist: string = '';
  /**
   * music cover
   */
  @Prop() musicCover: string = '';
  /**
   * 单曲循环
   */
  @Prop() loop: boolean = true;
  /**
   * 自动播放
   */
  @Prop() autoPlay: boolean = true;
  /**
   * 主题颜色
   */
  @Prop() themeColor: string = '133, 238, 252';
  /**
   * 动画速度
   */
  @Prop() duration: number = 1;

  @State()
  playing: boolean = false;

  element: HTMLAudioElement;

  onLeftClick() {
    if (this.element.paused) {
      this.element.play();
    } else {
      this.element.pause();
    }
  }

  initAudio(audio: HTMLAudioElement) {
    if (audio) {
      this.element = audio;
    }
    audio.addEventListener('ended', () => {
      console.log('ended');
    });
    audio.addEventListener('pause', () => {
      this.playing = false;
    });
    audio.addEventListener('play', () => {
      this.playing = true;
    });
  }

  render() {
    return (
      <div
        class="ball-outer"
        style={{
          ['--ball-size']: `${this.size}px`,
          ['--theme-color']: this.themeColor,
          ['--transition-duration']: `${this.duration}s`,
        }}
      >
        <audio
          controls
          src={this.musicUrl}
          ref={el => {
            this.initAudio(el);
          }}
          autoPlay={this.autoPlay}
          loop={this.loop}
        ></audio>
        <div class={this.playing ? 'ball playing' : 'ball'}>
          <div
            class="left"
            onClick={ev => {
              this.onLeftClick();
            }}
          >
            <div class="cover">
              <img draggable={false} src={this.musicUrl ? this.musicCover : 'this.musicCover'} />
            </div>
          </div>
          <div class="right">
            <div class="right-inner">
              <div class="title">{this.musicTitle}</div>
              <div class="artist">{this.musicArtist}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
