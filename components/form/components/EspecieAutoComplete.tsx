import useSWR, { Fetcher } from "swr";
import axios from "axios";
import { EspecieSimpleInterface } from "@/prisma/queries/especiesQueries";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDisponibilidadStore } from "@/hooks/disponibilidadStore";

interface EspecieAutoCompleteProps {
  className?: string;
  required?: boolean;
  readOnly?: boolean;
}

const fetcher: Fetcher<EspecieSimpleInterface[], string> = (url: string) =>
  axios
    .get(url, {
      params: {
        tipo: "simple",
      },
    })
    .then((res) => res.data);

export default function EspecieAutoComplete(props: EspecieAutoCompleteProps) {
  const disponibilidad = useDisponibilidadStore(
    (state) => state.disponibilidad
  );
  const setDisponibilidad = useDisponibilidadStore(
    (state) => state.setDisponibilidad
  );
  const { data: especies, error: especiesError } = useSWR(
    "/api/especies",
    fetcher
  );
  if (especiesError) return <div></div>;
  if (!especies) return <div>sdf</div>;
  return (
    <Autocomplete
      id="combo-box-demo"
      options={especies.map((item) => ({
        label: `${item.cientifico} - ${item.comun}`,
        id: `especieOption-${item.id}`,
        especie: item,
      }))}
      value={
        typeof disponibilidad.especie === "string"
          ? null
          : {
              label: `${disponibilidad.especie.cientifico} - ${disponibilidad.especie.comun}`,
              id: `especieOption-${disponibilidad.especie.id}`,
              especie: disponibilidad.especie,
            }
      }
      isOptionEqualToValue={(option, value) => option.id === value.id}
      // getOptionLabel={(option) =>
      //   `${option.especie.cientifico} - ${option.especie.comun}`
      // }
      onChange={(event: React.SyntheticEvent, value: any) => {
        console.log(value);
        setDisponibilidad({
          ...disponibilidad,
          especie: value !== null ? value.especie : disponibilidad.especie,
        });
      }}
      renderInput={(params) => <TextField {...params} label="Especie" />}
      {...props}
    />
  );
}
