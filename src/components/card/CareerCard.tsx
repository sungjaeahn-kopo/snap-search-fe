import LazyImageComponent from "@/components/common/LazyImageComponent";
import { Career } from "@/types/api";
import { Box, Card, Typography } from "@mui/material";

export const CareerCard = ({ career, isCurrent }: { career: Career; isCurrent: boolean }) => (
  <Card
    sx={{
      display: "flex",
      alignItems: "center",
      padding: "16px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      border: isCurrent ? "2px solid #1E88E5" : "1px solid #E0E0E0",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "scale(1.02)",
        boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
      },
      width: "100%", // 카드 폭 전체 사용
      backgroundColor: isCurrent ? "#F0F8FF" : "#FFFFFF",
    }}
  >
    {/* 로고 */}
    <LazyImageComponent
      src={career.teamLogo}
      alt={`${career.teamName} 로고`}
      width={50}
      height={50}
      style={{ objectFit: "contain", marginRight: "16px" }}
    />

    {/* 팀 정보 */}
    <Box sx={{ flex: 1 }}>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: isCurrent ? "700" : "600",
          color: isCurrent ? "#1E88E5" : "#374151",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={career.teamName}
      >
        {career.teamName}
        {isCurrent && (
          <Typography
            component="span"
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
              color: "#FF5722",
              marginLeft: "8px",
            }}
          >
            (현재)
          </Typography>
        )}
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          color: "#757575",
          marginTop: "4px",
        }}
        title={`${career.startDate} ~ ${career.endDate || "현재"}`}
      >
        {career.startDate} ~ {career.endDate || "현재"}
      </Typography>
    </Box>
  </Card>
);
