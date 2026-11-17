import EncabezadoComunidad from '../EncabezadoComunidad'

/**
 * Comentarios y Fotos · Célula 6 · Comunidad & Co-Creación.
 * Componente base: reemplazar el contenido bajo el header con la vista del módulo.
 */
function Comentarios() {
  return (
    <section className="space-y-9">
      <EncabezadoComunidad
        icono="bi-chat-heart-fill"
        colorIcono="text-amber-300"
        titulo="Comentarios y fotos"
        descripcion="Comparte cómo te quedó la receta, sube fotos de tus platos y conversa con otros cocineros de la comunidad."
      />

      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center dark:border-white/15 dark:bg-white/5">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
          <i className="bi bi-tools" aria-hidden="true"></i>
        </span>
        <h2 className="m-0 mt-4 font-poppins text-lg font-bold text-slate-900 dark:text-white">Módulo en construcción</h2>
        <p className="m-0 mt-2 text-sm text-slate-600 dark:text-slate-300">
          Muy pronto podrás publicar comentarios y fotos aquí.
        </p>
      </div>
    </section>
  )
}

export default Comentarios
