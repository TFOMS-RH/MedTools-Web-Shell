import { Skeleton } from "@mui/material";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";

export const RControlOncologyServiceCardSkelentons = () => {
  return Array.from({ length: 2 }).map((_, index) => (
    <article className="cardRoot" key={index}>
      <header className="cardHeader">
        <h2>Онкологическая услуга</h2>
      </header>
      <div className="cardContent">
        <div className="cardBlock">
          <div className="cardBlockField">
            <CardField label="Тип услуги" inline={true} value={<Skeleton />} />
            <CardField
              inline={true}
              label="Тип хирургического лечения"
              value={<Skeleton />}
            />
            <CardField
              inline={true}
              label="Линия лекарственной терапии"
              value={<Skeleton />}
            />
            <CardField
              inline={true}
              label="Проведение профилактики тошноты"
              value={<Skeleton />}
            />
            <CardField
              inline={true}
              label="Тип лучевой терапии"
              value={<Skeleton />}
            />
          </div>
        </div>
      </div>
    </article>
  ));
};
