import type { MedicalDeviceDto } from "../../../../../../../../../rControl/widgets/workspace/model/types/categories/providedServices/GetMedicalDevicesResult";
import { CardField } from "../../../../../../../../../../shared/ui/CardField/CardField";
import { Skeleton } from "@mui/material";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

interface MedicalDevicesBodyProps {
  medicalDevices: MedicalDeviceDto[];
  isPending: boolean;
}

export const MedViewMedicalDevicesBody = ({
  medicalDevices,
  isPending,
}: MedicalDevicesBodyProps) => {
  return (
    <div className="cardContent">
      <div className={styles.listContainer}>
        {isPending
          ? Array.from({ length: 5 }).map((_, index) => (
              <div className={styles.listRow} key={index}>
                <Skeleton variant="rounded" width={40} height={40} />
                <div className={styles.listRowContent}>
                  <p className={styles.date}>
                    <Skeleton />
                  </p>
                  <p className={styles.description}>
                    <Skeleton animation="wave" height={25} />
                  </p>
                </div>
              </div>
            ))
          : medicalDevices.map((medicalDevice, _index) => (
              <div
                className={styles.listRow}
                key={medicalDevice.medicalDeviceUid}
              >
                <div className={styles.number}>
                  <p>{_index + 1}</p>
                </div>
                <div className={styles.listRowContent}>
                  <CardField
                    label="Дата установки"
                    value={dayjs(medicalDevice.implantationDate).format(
                      "DD.MM.YYYY",
                    )}
                    inline={true}
                  />
                  <CardField
                    label="Код вида"
                    value={medicalDevice.medicalDeviceTypeCode}
                    inline={true}
                  />
                  <CardField
                    label="Серийный номер"
                    value={medicalDevice.serialNumber}
                    inline={true}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
