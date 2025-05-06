export async function postProcessorMethod(text1: string, text2: string): Promise<{
  highlights: Array<{
    id: number;
    from: number;
    to: number;
    type: string;
    value: string;
  }>
}> {
  const tk1 = tokenize(text1)
    .map((token, id) => ({ ...token, id }))
    .filter((t) => {
      if (!/\s/.test(t.value)) {
        return getRandomValue(0, 6) < 2;
      }

      return getRandomValue(0, 6) < 1;
    });

  const tk2 = tokenize(text2).map((token, id) => ({ ...token, id }));

  const highlights = tk1.map((t) => {
    const action = getRandomValue(0, 2) ? 'remove' : 'change';
    const value = action === 'remove' ? t.value : tk2[t.id]?.value || 'Random';

    return {
      id: t.id,
      from: t.from,
      to: t.to,
      type: action,
      value,
    };
  });

  return {
    highlights,
  };
}

function getRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * max) + min;
}

function tokenize(text: string) {
  const tokens: { value: string, from: number, to: number }[] = [];
  let currentPosition = 0;

  while (currentPosition < text.length) {
    const char = text[currentPosition];

    if (char === ' ' || char === '\t') {
      tokens.push({
        value: char,
        from: currentPosition,
        to: currentPosition + 1,
      });
      currentPosition++;
    } else {
      const wordStart = currentPosition;
      while (
        currentPosition < text.length &&
        text[currentPosition] !== ' ' &&
        text[currentPosition] !== '\t'
        ) {
        currentPosition++;
      }

      tokens.push({
        value: text.slice(wordStart, currentPosition),
        from: wordStart,
        to: currentPosition,
      });
    }
  }

  return tokens;
}

// console.log(compare('Hello words', 'Hallow visada'));

