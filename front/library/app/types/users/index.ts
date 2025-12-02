enum UserRole {
    Admin = "ADMIN",
    Bibliotecario = "BIBLIOTECARIO",
    Aluno = "ALUNO",
}

export type User = {
    id: string,
    email: string,
    name: string,
    role: UserRole,
    createdAt: Date,
    updatedAt: Date,
}