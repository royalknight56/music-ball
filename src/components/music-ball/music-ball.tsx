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
  @Prop() size: number = 80;
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
        }}
      >
        <audio
          controls
          src={this.musicUrl}
          ref={el => {
            this.initAudio(el);
          }}
          loop={this.loop}
        ></audio>
        <div class={
          this.playing ? 'ball playing' : 'ball'
        }>
          <div
            class="left"
            onClick={ev => {
              this.onLeftClick();
            }}
          >
            <div class="cover">
              <img src={this.musicUrl ? this.musicCover : 'this.musicCover'} />
            </div>
          </div>
          <div class="right">
            <div class="title">{this.musicTitle}</div>
            <div class="author">{this.musicArtist}</div>
          </div>
        </div>
      </div>
    );
  }
}
