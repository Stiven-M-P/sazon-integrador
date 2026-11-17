import { useMemo, useState } from 'react'
import EstadisticasModeracion from './EstadisticasModeracion'
import FiltrosReportes from './FiltrosReportes'
import TablaReportes from './TablaReportes'
import DetalleReporteModal from './DetalleReporteModal'
import { REPORTES_INICIALES } from './data'
import EncabezadoComunidad, { PanelDato } from '../EncabezadoComunidad'

const FILTROS = [
  { id: 'todos', label: 'Todos' },
  { id: 'pendiente', label: 'Pendientes' },
  { id: 'aprobado', label: 'Aprobados' },
  { id: 'bloqueado', label: 'Bloqueados / Descartados' },
]

function ReporteValoracion() {
  const [reportes, setReportes] = useState(REPORTES_INICIALES)
  const [filtroActivo, setFiltroActivo] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [pagina, setPagina] = useState(1)
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const reportesPorPagina = 5

  const conteos = useMemo(
    () => reportes.reduce(
      (totales, reporte) => {
        totales[reporte.estado] += 1
        return totales
      },
      { pendiente: 0, aprobado: 0, bloqueado: 0 },
    ),
    [reportes],
  )

  const reportesFiltrados = useMemo(() => {
    const consulta = busqueda.trim().toLocaleLowerCase('es')
    return reportes.filter((reporte) => {
      const coincideEstado =
        filtroActivo === 'todos' ||
        (filtroActivo === 'bloqueado'
          ? reporte.estado === 'bloqueado'
          : reporte.estado === filtroActivo)
      const coincideBusqueda =
        !consulta ||
        [reporte.id, reporte.usuario, reporte.contenido, reporte.receta, reporte.marca]
          .join(' ')
          .toLocaleLowerCase('es')
          .includes(consulta)
      return coincideEstado && coincideBusqueda
    })
  }, [busqueda, filtroActivo, reportes])

  const totalPaginas = Math.max(1, Math.ceil(reportesFiltrados.length / reportesPorPagina))
  const reportesVisibles = reportesFiltrados.slice(
    (pagina - 1) * reportesPorPagina,
    pagina * reportesPorPagina,
  )

  const cambiarFiltro = (filtro) => {
    setFiltroActivo(filtro)
    setPagina(1)
  }

  const cambiarBusqueda = (valor) => {
    setBusqueda(valor)
    setPagina(1)
  }

  const resolverReporte = (id, estado) => {
    setReportes((actuales) =>
      actuales.map((reporte) =>
        reporte.id === id ? { ...reporte, estado } : reporte,
      ),
    )
    setReporteSeleccionado(null)
    setMensaje(estado === 'aprobado' ? 'Reporte aprobado.' : 'Contenido bloqueado.')
    window.setTimeout(() => setMensaje(''), 3500)
  }

  const exportarCSV = () => {
    const columnas = ['ID reporte', 'Usuario reporta', 'Contenido denunciado', 'Motivo', 'Receta', 'Marca', 'Fecha', 'Estado']
    const filas = reportesFiltrados.map((reporte) => [
      reporte.id,
      reporte.usuario,
      reporte.contenido,
      reporte.motivo,
      reporte.receta,
      reporte.marca,
      reporte.fecha,
      reporte.estado,
    ])
    const csv = [columnas, ...filas]
      .map((fila) => fila.map((celda) => `"${String(celda).replaceAll('"', '""')}"`).join(','))
      .join('\r\n')
    const archivo = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(archivo)
    const enlace = document.createElement('a')
    enlace.href = url
    enlace.download = 'reportes-moderacion.csv'
    document.body.appendChild(enlace)
    enlace.click()
    enlace.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <section className="space-y-6">
      <EncabezadoComunidad
        icono="bi-shield-check"
        colorIcono="text-emerald-300"
        etiqueta="Moderación y confianza"
        titulo="Panel de moderación de reportes"
        descripcion="Supervisión, filtrado y resolución en tiempo real de interacciones comunitarias. Protección de recetas co-creadas con marcas Zenú, Doria, Pietrán, Noel, Chocolisto y Sello Rojo."
        aside={<PanelDato valor={conteos.pendiente} titulo="pendientes" detalle="SLA menor a 20 min" />}
      />

      <EstadisticasModeracion
        pendientes={conteos.pendiente}
        aprobados={142 + Math.max(0, conteos.aprobado - 2)}
        bloqueados={12 + Math.max(0, conteos.bloqueado - 1)}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm dark:border-white/10 dark:bg-sazon-verdeNutresaCard">
        <FiltrosReportes
          filtros={FILTROS}
          filtroActivo={filtroActivo}
          conteos={conteos}
          total={reportes.length}
          busqueda={busqueda}
          onCambiarFiltro={cambiarFiltro}
          onCambiarBusqueda={cambiarBusqueda}
          onExportar={exportarCSV}
        />
        <TablaReportes
          reportes={reportesVisibles}
          total={reportesFiltrados.length}
          pagina={pagina}
          totalPaginas={totalPaginas}
          inicio={(pagina - 1) * reportesPorPagina}
          onCambiarPagina={setPagina}
          onAbrirReporte={setReporteSeleccionado}
        />
      </div>

      {reporteSeleccionado && (
        <DetalleReporteModal
          reporte={reporteSeleccionado}
          onCerrar={() => setReporteSeleccionado(null)}
          onResolver={resolverReporte}
        />
      )}

      {mensaje && (
        <p
          role="status"
          className="fixed bottom-20 left-1/2 z-50 m-0 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-sazon-verdeNoche px-4 py-3 text-sm text-white shadow-xl"
        >
          <i className="bi bi-check-circle-fill text-sazon-verdeNeon"></i>
          {mensaje}
        </p>
      )}
    </section>
  )
}

export default ReporteValoracion
