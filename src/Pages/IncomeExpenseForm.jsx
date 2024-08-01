import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import Select from 'react-select';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { NumericFormat } from 'react-number-format';
import Layout from '../components/containers/Layouts/Layout';
import { createPresupuesto } from '../components/services/api';
import { categorias, tiposGasto } from '../components/common/Categorias';

const IncomeExpenseForm = () => {
    const { register, handleSubmit, control, setValue, watch } = useForm({
        defaultValues: {
            monto_total: 0,
            fecha_inicio: new Date().toISOString().split('T')[0],
            fecha_fin: new Date().toISOString().split('T')[0],
            descripcion: '',
            detalles: [{ categoria: '', tipo_gasto: '', descripcion: '', monto: '', fecha: new Date().toISOString().split('T')[0], tiene_fecha_limite: false, fecha_limite: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'detalles'
    });

    const onSubmit = data => {
        createPresupuesto(data)
            .then(response => {
                console.log('Presupuesto creado:', response);
                // Resetea el formulario si es necesario
            })
            .catch(error => console.error('Error creating presupuesto:', error));
    };

    const handleCategoriaChange = (selectedOption, index) => {
        setValue(`detalles.${index}.categoria`, selectedOption.value, { shouldValidate: true });
        setValue(`detalles.${index}.tipo_gasto`, ''); // Resetea tipo de gasto al cambiar la categoría
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow-lg rounded-lg space-y-6 max-w-4xl mx-auto">
                {/* Fila para Monto Total y Fechas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Monto Total</label>
                        <Controller
                            name="monto_total"
                            control={control}
                            render={({ field }) => (
                                <NumericFormat
                                    {...field}
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="$"
                                    decimalScale={0}
                                    fixedDecimalScale={false}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    allowNegative={false}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
                        <input
                            type="date"
                            {...register('fecha_inicio')}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
                        <input
                            type="date"
                            {...register('fecha_fin')}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Descripción */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                        {...register('descripcion')}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                    />
                </div>

                {/* Detalles de Gasto */}
                <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Detalles de Gasto</h3>
                    {fields.map((item, index) => (
                        <div key={item.id} className="mb-4 p-4 rounded-md bg-gray-50 shadow-inner">
                            <div className="flex items-center space-x-4 mb-4">
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                    <Controller
                                        name={`detalles.${index}.categoria`}
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                options={categorias}
                                                onChange={option => handleCategoriaChange(option, index)}
                                                placeholder="Selecciona una categoría"
                                                value={categorias.find(c => c.value === field.value)}
                                                className="w-full"
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Gasto</label>
                                <Controller
                                    name={`detalles.${index}.tipo_gasto`}
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={tiposGasto[watch(`detalles.${index}.categoria`)] || []}
                                            placeholder="Selecciona un tipo de gasto"
                                            className="w-full"
                                        />
                                    )}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <input
                                    type="text"
                                    {...register(`detalles.${index}.descripcion`)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                                <Controller
                                    name={`detalles.${index}.monto`}
                                    control={control}
                                    render={({ field }) => (
                                        <NumericFormat
                                            {...field}
                                            thousandSeparator="."
                                            decimalSeparator=","
                                            prefix="$"
                                            decimalScale={2}
                                            fixedDecimalScale={false}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            allowNegative={false}
                                        />
                                    )}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                                <input
                                    type="date"
                                    {...register(`detalles.${index}.fecha`)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1 items-center">
                                    <input
                                        type="checkbox"
                                        {...register(`detalles.${index}.tiene_fecha_limite`)}
                                        className="mr-2"
                                    />
                                    Tiene Fecha Límite
                                </label>
                            </div>

                            {watch(`detalles.${index}.tiene_fecha_limite`) && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Límite</label>
                                    <input
                                        type="date"
                                        {...register(`detalles.${index}.fecha_limite`)}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => append({ categoria: '', tipo_gasto: '', descripcion: '', monto: '', fecha: new Date().toISOString().split('T')[0], tiene_fecha_limite: false, fecha_limite: '' })}
                        className="text-blue-500 hover:text-blue-700 flex items-center space-x-2 mt-4"
                    >
                        <FaPlus /> <span>Agregar Detalle</span>
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Guardar Presupuesto
                </button>
            </form>
        </Layout>
    );
};

export default IncomeExpenseForm;
