use solana_program::{
    entrypoint,
    entrypoint::ProgramResult,
    account_info::{AccountInfo},
    msg,
    pubkey::Pubkey,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Hello Solana");
    let key: &u8 = instruction_data.first().unwrap();
    match key {
        0 => msg!("zero"),
        1 => msg!("one"),
        _ => msg!("unknown number")
    };
    msg!("process_instruction: {}: {} accounts, data={:?}",
        program_id,
        accounts.len(),
        instruction_data
    );
    Ok(())
}
