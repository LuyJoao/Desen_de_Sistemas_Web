package UsuarioController;

import Usuario.Model;
import UsuarioView.View;

import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;


public class Controller {
    Model model;
    View view;

    public Controller(Model aModel, View aView) {
        model = aModel;
        view = aView;
        view.setBotaoBehavior(new BotaoBehavior());
    }

    class BotaoBehavior implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            String textoNome = view.getNome();
            String textoSobrenome = view.getSobrenome();
            model.setNomeCompleto(textoNome, textoSobrenome);
            model.Junta();
            String resultado = model.getNomeCompleto();
            view.setVisor(resultado);
        }
    }
}

