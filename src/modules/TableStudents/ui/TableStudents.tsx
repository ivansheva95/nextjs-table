'use client'

import React from 'react'
import {
  Column,
  usePagination,
  useSortBy,
  useTable
} from 'react-table'

// ------------------------------------------------------------

import { TableStudentsType } from '../types/TableStudentsType'
import { tableStudentsApi } from '../services/tableStudentsApi'
import { ErrorBoundary } from '@/components'
import {
  Button,
  Loader
} from '@/ui'

// ------------------------------------------------------------

import styles from './tableStudents.module.scss'

// ------------------------------------------------------------

export default function TableStudents() {

  const [students, setStudents] = React.useState<TableStudentsType[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const [viewProgressIds, setViewProgressIds] = React.useState<Array<number>>([])
  const [editModeProgressIds, setEditModeProgressIds] = React.useState<Array<number>>([])
  const editModeInputsRef = React.useRef<HTMLInputElement[]>([])
  const [currentInputId, setCurrentInputId] = React.useState<number | null>(null)

  React.useEffect(() => {
    const getStudents = async () => {
      setIsLoading(true)
      const students = await tableStudentsApi.getAll()
      setStudents(students)
      setIsLoading(false)
    }
    getStudents()
  }, [])

  React.useEffect(() => {
    currentInputId && editModeInputsRef.current[currentInputId].focus()
  }, [currentInputId])

  const handleUpdateProcess = (id: number) => {
    setStudents(prev => prev.map(student => student.id === id
      ? {
        ...student,
        progress: editModeInputsRef.current[id].value === '100'
          ? Number(editModeInputsRef.current[id].value)
          : Number(editModeInputsRef.current[id].value.substring(0, 2))
      }
      : student
    ))
    setEditModeProgressIds(prev => prev.filter(progressId => progressId !== id))
    setCurrentInputId(null)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (event.code === 'Enter') {
      handleUpdateProcess(id)
    }
  }

  const handleEditModeProgressIds = (id: number) => {
    if (editModeProgressIds.find(progressId => progressId === id)) {
      setEditModeProgressIds(editModeProgressIds.filter(progressId => progressId !== id))
    } else {
      setEditModeProgressIds([...editModeProgressIds, id])
      setCurrentInputId(id)
    }
  }

  const handleViewProcessIds = (id: number) => {
    viewProgressIds.find(progressId => progressId === id)
      ? setViewProgressIds(prev => prev.filter(progressId => progressId !== id))
      : setViewProgressIds(prev => [...prev, id])
  }

  const tableColumns: Column[] = [
    {
      Header: 'ID',
      accessor: 'id',
      disableSortBy: true
    },
    {
      Header: 'Student',
      accessor: 'student'
    },
    {
      Header: 'Course',
      accessor: 'course'
    },
    {
      Header: 'Module',
      accessor: 'module'
    },
    {
      Header: 'Lesson',
      accessor: 'lesson'
    },
    {
      Header: 'Progress',
      accessor: 'progress',
      disableSortBy: true
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: (column: any) => (
        <div className={styles.btnGroup}>
          <Button onClick={() => handleViewProcessIds(column.cell.row.original.id)}>View</Button>
          <Button
            disabled={!viewProgressIds.find(progressId => progressId === column.cell.row.original.id)}
            onClick={() => handleEditModeProgressIds(column.cell.row.original.id)}
          >
            Edit
          </Button>
        </div >
      ),
      disableSortBy: true
    },
  ]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = React.useMemo(() => tableColumns, [viewProgressIds, editModeProgressIds])
  const data = React.useMemo(() => students, [students])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
    prepareRow
  } = useTable(
    { columns, data },
    useSortBy,
    usePagination
  )

  const visibleProcess = (id: number) => {
    return viewProgressIds.find(progressId => progressId === id)
      ? `${styles.progress} ${styles.active}`
      : styles.progress
  }
  return (
    <ErrorBoundary>
      <div className={[`${styles.tableStudents}`, 'container'].join(' ')}>
        {isLoading
          ? (
            <div className={styles.loading}>
              <Loader />
            </div>
          )
          : (
            <>
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.getHeaderProps().key}>
                          {column.render('Header')}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                              : ''}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()} key={row.getRowProps().key}>
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()} key={cell.getCellProps().key}
                            className={[
                              `${cell.column.id === 'progress' ? visibleProcess(Number(cell.row.id) + 1) : ''}`,
                            ].join(' ')}
                          >
                            {
                              cell.column.id === 'progress'
                                ? editModeProgressIds.find(progressId => progressId === Number(cell.row.id) + 1)
                                  ? <input
                                    type="number"
                                    min='0'
                                    max='100'
                                    maxLength={3}
                                    defaultValue={cell.value}
                                    onBlur={() => handleUpdateProcess(Number(cell.row.id) + 1)}
                                    onKeyDown={event => handleKeyDown(event, Number(cell.row.id) + 1)}
                                    ref={element => editModeInputsRef.current[Number(cell.row.id) + 1] = element as HTMLInputElement}
                                  />
                                  : cell.render('Cell')
                                : cell.render('Cell')
                            }
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div className={styles.pagination}>
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>

                <span>
                  Page
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>
                </span>

                <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
              </div>
            </>
          )}
      </div>
    </ErrorBoundary>
  )
}
