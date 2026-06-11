// componente select

export default function Select({
    label,
    htmlFor,
    name,
    options = [],
}){

    return (
        <div>
            {/* Label solo muestra si es truthy un uno lógico */}
            {label && (
            <label htmlFor={htmlFor}
                   className="
                   block
                   text-caption
                   text-secondary
                   " 
            >
                {label}
            </label>
            )}

            {/* Select */}
            <select
                name={name} 
                id="htmlFor"
                className="
                    w-80
                    h-10
                    rounded-md
                    border
                    px-4

                    hover:border
                    hover:border-2
                    hover:border-focus-border
                "
            >
                <option value="">Seleccione un opción</option>

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}