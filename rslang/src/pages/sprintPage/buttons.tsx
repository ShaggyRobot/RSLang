import * as React from 'react';
import Button from '@mui/material/Button';
import ArrowCircleLeftSharpIcon from '@mui/icons-material/ArrowCircleLeftSharp';
import ArrowCircleRightSharpIcon from '@mui/icons-material/ArrowCircleRightSharp';

import Stack from '@mui/material/Stack';

export default function IconLabelButtons(): JSX.Element {
  return (
    <Stack direction='row' spacing={2}>
      <Button variant='contained' startIcon={<ArrowCircleLeftSharpIcon />}>
        Верно
      </Button>
      <Button variant='contained' endIcon={<ArrowCircleRightSharpIcon />}>
        Неверно
      </Button>
    </Stack>
  );
}
