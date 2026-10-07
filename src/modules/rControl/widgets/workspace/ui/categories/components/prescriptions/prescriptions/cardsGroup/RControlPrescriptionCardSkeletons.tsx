import { Skeleton } from "@mui/material";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";

export const RControlPrescriptionCardSkeletons = () => {
  return Array.from({ length: 2 }).map((_) => (
    <article className="cardRoot">
      <header className="cardHeader">
        <h2>Назначение №{<Skeleton />}</h2>
      </header>
      <div className="cardContent">
        <div className="cardLineGroup">
          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>НАЗНАЧЕНИЕ</h3>
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Вид назначения"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Метод диагностического лечения"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Медицинская услуга в направление"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>НАПРАВЛЕНИЕ</h3>
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Дата направления"
                value={<Skeleton />}
                inline={true}
              />
            </div>
            <div className="cardBlockLineOneGrid">
              <CardField
                label="Медицинская организация назначения"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>

          <div className="cardLine">
            <div className="cardLineHeader">
              <h3>ПРОФИЛЬ</h3>
            </div>
            <div className="cardBlockLineTwoGrid">
              <CardField
                label="Профиль МП"
                value={<Skeleton />}
                inline={true}
              />
              <CardField
                label="Профиль койки"
                value={<Skeleton />}
                inline={true}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  ));
};
