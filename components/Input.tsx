interface InputProps {
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function Input({ label, placeholder, disabled }: InputProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        // display: 'block',
        marginBottom: '8px',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-primary)',
        fontSize: '14px',
        fontWeight: '500',
      }}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '12px',
          border: `1px solid ${disabled ? 'var(--color-border)' : 'var(--color-main)'}`,
          borderRadius: '8px',
          backgroundColor: disabled ? 'var(--color-border)' : 'var(--color-bg)',
          color: disabled ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
          fontFamily: 'var(--font-primary)',
          fontSize: '14px',
          outline: 'none',
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--color-main)'}
        onBlur={(e) => e.target.style.borderColor = disabled ? 'var(--color-border)' : 'var(--color-main)'}
      />
    </div>
  );
}