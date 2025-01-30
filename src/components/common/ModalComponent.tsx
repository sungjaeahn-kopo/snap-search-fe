import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseRounded";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const ModalComponent = ({ open, onClose, title, content }: ModalProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="md"
    PaperProps={{
      sx: {
        borderRadius: "16px",
        padding: "16px",
        background: "linear-gradient(to bottom, #ffffff, #f4f4f4)",
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
      },
    }}
  >
    {/* 모달 타이틀 */}
    <DialogTitle
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        borderBottom: "1px solid #e0e0e0",
        fontWeight: 700,
        fontSize: "20px",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {title}
      </Typography>
      <IconButton onClick={onClose} sx={{ color: "#555" }}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>

    {/* 모달 내용 */}
    <DialogContent
      sx={{
        marginTop: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Box
        sx={{
          width: "100%", // 컨테이너가 꽉 차도록 설정
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center", // 아이템 중앙 정렬
          alignItems: "center",
          gap: "16px",
        }}
      >
        {content}
      </Box>
    </DialogContent>
  </Dialog>
);

export default ModalComponent;
