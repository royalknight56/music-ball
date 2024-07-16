import { newSpecPage } from '@stencil/core/testing';
import { MusicBall } from './music-ball';

describe('music-ball', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [MusicBall],
      html: '<music-ball></music-ball>',
    });
    expect(root).toEqualHtml(`
      <music-ball>
        <mock:shadow-root>
          <div>
            Hello, World! I'm
          </div>
        </mock:shadow-root>
      </music-ball>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [MusicBall],
      html: `<music-ball first="Stencil" last="'Don't call me a framework' JS"></music-ball>`,
    });
    expect(root).toEqualHtml(`
      <music-ball first="Stencil" last="'Don't call me a framework' JS">
        <mock:shadow-root>
          <div>
            Hello, World! I'm Stencil 'Don't call me a framework' JS
          </div>
        </mock:shadow-root>
      </music-ball>
    `);
  });
});
