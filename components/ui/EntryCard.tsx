import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  List,
  Paper,
  Typography,
} from "@mui/material";
import React, { DragEvent, FC, useContext } from "react";
import { Entry } from "../../interfaces/entry";
import { UIContext } from "../../context/ui/UIContext";
import { useRouter } from "next/router";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", entry._id);

    startDragging();
  };
  const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
    endDragging();
  };

  const onShowDetail = () => {};

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onShowDetail}
    >
      <CardActionArea>
        <CardContent>
          <Typography>{entry.description}</Typography>
        </CardContent>

        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: "2" }}
        >
          <Typography>{entry.createdAt}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
