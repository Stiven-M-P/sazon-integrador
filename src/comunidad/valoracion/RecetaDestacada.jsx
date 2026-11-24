import Estrellas from './Estrellas'
import ImagenPlato from './ImagenPlato'
import EncabezadoComunidad from '../EncabezadoComunidad'

function RecetaDestacada({ receta }) {
  const { id, titulo, descripcion, etiquetaImagen, imagen, tiempo, porciones, ahorro, promedio, totalEvaluaciones } =
    receta

  return (
    <EncabezadoComunidad>
      <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-center">
          <ImagenPlato
            src={imagen}
            alt={titulo}
            className="h-40 w-full shrink-0 rounded-2xl border border-white/15 shadow-lg sm:h-32 sm:w-32"
          >
            {etiquetaImagen && (
              <figcaption className="absolute bottom-2 left-2 rounded-full border border-white/30 bg-black/35 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                {etiquetaImagen}
              </figcaption>
            )}
          </ImagenPlato>

          <div className="min-w-0">
            <p className="m-0 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">
                <i className="bi bi-star-fill text-amber-300" aria-hidden="true"></i>
                Sa·zón · Comunidad
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-emerald-100">
                Receta destacada · #{id}
              </span>
            </p>
            <h1 className="m-0 mt-4 font-poppins text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {titulo}
            </h1>
            <p className="m-0 mt-3 max-w-xl text-sm leading-relaxed text-emerald-50 sm:text-base">{descripcion}</p>
            <ul className="m-0 mt-4 flex list-none flex-wrap items-center gap-x-5 gap-y-1 p-0 text-sm text-emerald-50">
              <li className="flex items-center gap-2">
                <i className="bi bi-clock text-emerald-300" aria-hidden="true"></i>
                {tiempo}
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-people text-emerald-300" aria-hidden="true"></i>
                {porciones} porciones
              </li>
              <li className="flex items-center gap-2">
                <i className="bi bi-piggy-bank text-emerald-300" aria-hidden="true"></i>
                Ahorro: {ahorro}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-fit shrink-0 items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm">
          <span className="flex h-12 w-14 items-center justify-center rounded-xl bg-white text-2xl font-bold text-emerald-900">
            {promedio}
          </span>
          <span>
            <Estrellas valor={promedio} tamano="text-lg" color="text-amber-300" />
            <span className="block text-xs text-emerald-100">{totalEvaluaciones} cocineros evaluaron</span>
          </span>
        </div>
      </div>
    </EncabezadoComunidad>
  )
}

export default RecetaDestacada
