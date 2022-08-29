import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';

import { ModalChildrenProps } from '../types';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function OpenModal({ children, nameOption }: ModalChildrenProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{nameOption}</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Tooltip title="Delete">
            <>{children}</>
          </Tooltip>
        </Box>
      </Modal>
    </div>
  );
}
